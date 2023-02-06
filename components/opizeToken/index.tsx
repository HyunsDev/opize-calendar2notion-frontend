import Image from 'next/image';
import { cv } from 'opize-design-system';
import styled from 'styled-components';
import OpizeFoxImage from '../../assets/opize_fox.png';

const Divver = styled.a`
    background: linear-gradient(90deg, #293c3a 19.44%, #2d6560 101.39%);
    border-radius: 100px;
    display: flex;
    padding-right: 20px;
    gap: 8px;
    width: fit-content;
    text-decoration: none;
`;

const Icon = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 32px;
    overflow: hidden;
    background-color: #24685f;
`;

const Text = styled.div`
    display: flex;
    align-items: center;
    color: #dae7d3;
    font-weight: ${cv.fontWeightSemiBold};
`;

export function IndexOpizeToken() {
    return (
        <Divver href="https://opize.me" target={'_blank'}>
            <Icon>
                <Image src={OpizeFoxImage} width="32px" height="32px" alt="" />
            </Icon>
            <Text>Opize Project #1</Text>
        </Divver>
    );
}
