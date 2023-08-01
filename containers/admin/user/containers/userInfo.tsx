import { useRecoilValue } from 'recoil';
import { AdminUserSearchState } from '../state/adminUser.state';
import {
    ActionMenu,
    Button,
    Flex,
    H3,
    Select,
    Switch,
    Table,
    Text,
    TextField,
    cv,
    useCodeModal,
    useModal,
} from 'opize-design-system';
import { useState } from 'react';
import { UserStatusToken, getUserStatus } from '../components/userStatusToken';
import { UserDto } from '@opize/calendar2notion-object';
import { Check, DotsThreeVertical, Eye, PenNib, X } from 'phosphor-react';
import { useAdminUser } from '../hooks/useAdminUser';
import { editableProps } from '../const/editableProps';
import { useMutation } from 'react-query';
import { client } from '../../../../lib/client';
import { toast } from 'react-toastify';
import { APIResponseError } from 'endpoint-client';

const favoriteProps = [
    'id',
    'name',
    'email',
    'googleEmail',
    'opizeId',
    'notionDatabaseId',
    'lastCalendarSync',
    'lastSyncStatus',
    'isWork',
    'status',
];

function UserInfoTableRowEditMode({
    _key: key,
    initValue,
    setIsEditMode,
}: {
    _key: keyof typeof editableProps;
    initValue: any;
    setIsEditMode: (isEditMode: boolean) => void;
}) {
    const [value, setValue] = useState(initValue);
    const { adminUser, refetchAdminUser } = useAdminUser();

    const _value = editableProps[key] === 'number' ? +value : value;

    const { mutate } = useMutation(
        () =>
            client.admin.user.patch({
                userId: adminUser?.user.id as number,
                [key]: _value,
            }),
        {
            onSuccess: () => {
                refetchAdminUser();
                toast.info('유저 정보를 수정했습니다.');
                setIsEditMode(false);
            },
            onError: (err: any) => {
                if (err instanceof APIResponseError) {
                    console.error(err);
                    toast.error(err.body.message);
                } else {
                    console.error(err);
                    toast.error(err.message);
                }
            },
        }
    );

    let Field = <></>;

    if (editableProps[key] === 'string') {
        Field = <TextField value={value} onChange={(e) => setValue(e.target.value)} />;
    }

    if (editableProps[key] === 'number') {
        Field = <TextField value={value} onChange={(e) => setValue(e.target.value)} type="number" />;
    }

    if (editableProps[key] === 'boolean') {
        Field = <Switch checked={value} onChange={(e) => setValue(!value)} />;
    }

    if (Array.isArray(editableProps[key])) {
        Field = (
            <Select value={value} onChange={(e) => setValue(e.target.value)}>
                {(editableProps[key] as string[]).map((e, i) => (
                    <Select.Option key={i} value={e}>
                        {e}
                    </Select.Option>
                ))}
            </Select>
        );
    }

    return (
        <Table.Row>
            <Table.Data width="200px">{key}</Table.Data>
            <Table.Data>{Field}</Table.Data>
            <Table.Data $align="flex-end" width="100px">
                <Button icon={<Check color={cv.green1} />} onClick={() => mutate()} variant="text" />
                <Button icon={<X color={cv.red1} />} onClick={() => setIsEditMode(false)} variant="text" />
            </Table.Data>
        </Table.Row>
    );
}

function UserInfoTableRow({ _key: key, value }: { _key: string; value: any }) {
    const codeModal = useCodeModal();
    const [isEditMode, setIsEditMode] = useState(false);

    const openValueModal = () => {
        let code = value;
        try {
            code = JSON.parse(value);
        } catch {
            code = value;
        }
        codeModal(key, code);
    };

    if (isEditMode && key in editableProps) {
        return (
            <UserInfoTableRowEditMode
                _key={key as keyof typeof editableProps}
                initValue={value}
                setIsEditMode={setIsEditMode}
            />
        );
    }

    return (
        <Table.Row>
            <Table.Data width="200px">{key}</Table.Data>
            <Table.Data>
                <Text
                    style={{
                        wordBreak: 'break-all',
                    }}
                >
                    {JSON.stringify(value)}
                </Text>
            </Table.Data>
            <Table.Data $align="flex-end" width="100px">
                {Object.keys(editableProps).includes(key) && (
                    <Button
                        icon={<PenNib color={cv.text3} />}
                        onClick={() => setIsEditMode(!isEditMode)}
                        variant="text"
                    />
                )}
                <Button icon={<Eye color={cv.text3} />} onClick={() => openValueModal()} variant="text" />
            </Table.Data>
        </Table.Row>
    );
}

function UserInfoTable({ user, isOpenFullInfo }: { user: UserDto; isOpenFullInfo: boolean }) {
    return (
        <Table>
            <Table.THead>
                <Table.Row>
                    <Table.Head width="200px">Key</Table.Head>
                    <Table.Head>Value</Table.Head>
                    <Table.Head $align="flex-end" width="100px"></Table.Head>
                </Table.Row>
            </Table.THead>
            <Table.TBody>
                {Object.entries(user)
                    .filter((e) => isOpenFullInfo || favoriteProps.includes(e[0]))
                    .map(([key, value]) => (
                        <UserInfoTableRow key={key} _key={key} value={value} />
                    ))}
            </Table.TBody>
        </Table>
    );
}

export function AdminUserInfoContainer() {
    const { adminUser } = useAdminUser();
    const [isOpenFullInfo, setIsOpenFullInfo] = useState(false);

    if (!adminUser) return <>유저를 먼저 조회해주세요</>;

    return (
        <Flex.Column gap="8px" id="user-user">
            <Flex.Between>
                <Flex.Row gap="8px">
                    <H3>User</H3>
                    <UserStatusToken status={getUserStatus(adminUser.user)} />
                </Flex.Row>
                <Switch text="전체 속성" checked={isOpenFullInfo} onChange={() => setIsOpenFullInfo(!isOpenFullInfo)} />
            </Flex.Between>
            <UserInfoTable user={adminUser.user} isOpenFullInfo={isOpenFullInfo} />
        </Flex.Column>
    );
}
