import Image from 'next/image';
import styled from 'styled-components';
import OpizeFoxImage from '../../assets/opize_fox_transparent.png';

const Divver = styled.a`
    background: linear-gradient(90deg, #649dff 19.44%, #9764ff 101.39%);
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
    background-color: rgba(255, 255, 255, 0.1);
`;

const Text = styled.div`
    display: flex;
    align-items: center;
    color: #ffffff;
    font-weight: 600;
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
