import type { NextPage } from 'next';
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
    PageLayout,
    H1,
    Flex,
    Text,
    cv,
    Button,
    Link as A,
    PageHead,
    ActionList,
    TextField,
    CodeBlock,
    Box,
    Select,
    ItemsTable,
    useCodeModal,
    useModal,
} from 'opize-design-system';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { client } from '../../../../lib/client';

export function AdminSearchUser({ user, setUser }: { user: any; setUser: (user: any) => void }) {
    const ref = useRef<HTMLInputElement>(null);

    const [text, setText] = useState('');
    const [select, setSelect] = useState('email');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (ref.current) ref.current.focus();
    }, []);

    const fetchUser = async () => {
        try {
            setUser({});
            setIsLoading(true);
            const res = await client.admin.findUser({
                [select]: text,
            });
            setUser(res);
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            if (err.code === 404) {
                toast.warn(err?.message || '유저를 조회할 수 없습니다.');
            } else {
                toast.error(err?.message || '유저를 조회할 수 없습니다.');
            }
        }
    };

    const onkeydown = async (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') await fetchUser();
        if (e.code === 'Escape') setText('');
    };

    return (
        <Flex.Between gap="8px" id="조회">
            <Select onChange={(e) => setSelect(e.target.value)} defaultValue={select}>
                <Select.Option value="id">id</Select.Option>
                <Select.Option value="opizeId">opizeId</Select.Option>
                <Select.Option value="email">email</Select.Option>
                <Select.Option value="googleEmail">googleEmail</Select.Option>
            </Select>
            <TextField
                placeholder={select}
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={onkeydown}
                ref={ref}
            />
            <Button variant="contained" width="100px" onClick={fetchUser} isLoading={isLoading}>
                조회
            </Button>
        </Flex.Between>
    );
}
