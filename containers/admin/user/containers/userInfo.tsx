import { useRecoilValue } from 'recoil';
import { AdminUserSearchState } from '../state/adminUser.state';
import {
    Menu,
    Button,
    Flex,
    H3,
    Select,
    Switch,
    Table,
    Text,
    Input,
    cv,
    useCodeModal,
    useModal,
} from 'opize-design-system';
import { useState } from 'react';
import { UserStatusBadge, getUserStatus } from '../components/userStatusToken';
import { UserDto } from '@opize/calendar2notion-object';
import { Check, DotsThreeVertical, Eye, PenNib, X } from '@phosphor-icons/react';
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
    'isConnected',
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
        Field = <Input value={value} onChange={(e) => setValue(e.target.value)} />;
    }

    if (editableProps[key] === 'number') {
        Field = <Input value={value} onChange={(e) => setValue(e.target.value)} type="number" />;
    }

    if (editableProps[key] === 'boolean') {
        Field = <Switch checked={value} onChange={(e) => setValue(!value)} />;
    }

    if (Array.isArray(editableProps[key])) {
        Field = (
            <Select value={value} onChange={(e) => setValue(e.target.value)}>
                {(editableProps[key] as string[]).map((e, i) => (
                    <option key={i} value={e}>
                        {e}
                    </option>
                ))}
            </Select>
        );
    }

    return (
        <Table.Row>
            <Table.Cell>{key}</Table.Cell>
            <Table.Cell>{Field}</Table.Cell>
            <Table.Cell align="right">
                <Button onClick={() => mutate()} variant="tertiary" iconOnly shape="round">
                    <Check color={cv.green} />
                </Button>
                <Button onClick={() => setIsEditMode(false)} variant="tertiary" iconOnly shape="round">
                    <X color={cv.red} />
                </Button>
            </Table.Cell>
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
        } catch (err) {
            code = value;
        }

        codeModal.open(String(code), {
            language: 'json',
        });
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
            <Table.Cell>{key}</Table.Cell>
            <Table.Cell>{JSON.stringify(value)}</Table.Cell>
            <Table.Cell align="right">
                {Object.keys(editableProps).includes(key) && (
                    <Button shape="round" iconOnly onClick={() => setIsEditMode(!isEditMode)} variant="tertiary">
                        <PenNib color={cv.gray400} />
                    </Button>
                )}
                <Button shape="round" iconOnly onClick={() => openValueModal()} variant="tertiary">
                    <Eye color={cv.gray400} />
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}

function UserInfoTable({ user, isOpenFullInfo }: { user: UserDto; isOpenFullInfo: boolean }) {
    return (
        <Flex
            style={{
                width: '100%',
                overflowX: 'auto',
            }}
        >
            <Table>
                <Table.Head>
                    <Table.Row>
                        <Table.Column>Key</Table.Column>
                        <Table.Column>Value</Table.Column>
                        <Table.Column align="right"> </Table.Column>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {Object.entries(user)
                        .filter((e) => isOpenFullInfo || favoriteProps.includes(e[0]))
                        .map(([key, value]) => (
                            <UserInfoTableRow key={key} _key={key} value={value} />
                        ))}
                </Table.Body>
            </Table>
        </Flex>
    );
}

export function AdminUserInfoContainer() {
    const { adminUser } = useAdminUser();
    const [isOpenFullInfo, setIsOpenFullInfo] = useState(false);

    if (!adminUser) return <>유저를 먼저 조회해주세요</>;

    return (
        <Flex.Column gap="8px" id="user-user">
            <Flex.Between width="100%">
                <Flex.Row gap="8px">
                    <H3>User</H3>
                    <UserStatusBadge status={getUserStatus(adminUser.user)} />
                </Flex.Row>
                <Switch checked={isOpenFullInfo} onChange={() => setIsOpenFullInfo(!isOpenFullInfo)}>
                    전체 속성
                </Switch>
            </Flex.Between>
            <UserInfoTable user={adminUser.user} isOpenFullInfo={isOpenFullInfo} />
        </Flex.Column>
    );
}
