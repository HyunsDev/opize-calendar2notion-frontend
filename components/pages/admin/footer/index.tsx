import Image from 'next/image';
import { ActionMenu, Footer, useColorTheme } from 'opize-design-system';
import { Atom, Moon, Sun } from 'phosphor-react';
import styled from 'styled-components';
import Logo from '../../../../assets/logo.png';

const StyledLogo = styled.div`
    width: 60px;
    height: 60px;
`;

export function AdminFooter() {
    const { setColorTheme, nowColorTheme, colorTheme } = useColorTheme();

    return (
        <Footer>
            <Footer.Navigation>
                <Footer.Navigation.Item>
                    <Footer.Navigation.Item.Title>소개</Footer.Navigation.Item.Title>
                    <Footer.Navigation.Item.Link to="/">소개</Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="/">도움말</Footer.Navigation.Item.Link>
                </Footer.Navigation.Item>

                <Footer.Navigation.Item>
                    <Footer.Navigation.Item.Title>블로그</Footer.Navigation.Item.Title>
                    <Footer.Navigation.Item.Link to="/">Opize 블로그</Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="/">개발자 블로그</Footer.Navigation.Item.Link>
                </Footer.Navigation.Item>

                <Footer.Navigation.Item>
                    <Footer.Navigation.Item.Title>이용 및 약관</Footer.Navigation.Item.Title>
                    <Footer.Navigation.Item.Link to="/">개인정보 처리방침</Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="/">서비스 약관</Footer.Navigation.Item.Link>
                </Footer.Navigation.Item>

                <Footer.Navigation.Item>
                    <Footer.Navigation.Item.Title>개발</Footer.Navigation.Item.Title>
                    <Footer.Navigation.Item.Link to="/">개발자</Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="https://design.hyuns.dev">
                        디자인 시스템
                    </Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="/">브랜드 리소스</Footer.Navigation.Item.Link>
                </Footer.Navigation.Item>
            </Footer.Navigation>
            <Footer.Menu>
                <Footer.Menu.Item>
                    <StyledLogo>
                        <Image src={Logo} width={36} height={36} alt="" />
                    </StyledLogo>
                </Footer.Menu.Item>
                <Footer.Menu.Item>{''}</Footer.Menu.Item>
                <Footer.Menu.Item>
                    <ActionMenu
                        actions={[
                            [
                                {
                                    label: 'Light',
                                    onClick: () => setColorTheme('light'),
                                    icon: <Sun />,
                                },
                                {
                                    label: 'Dark',
                                    onClick: () => setColorTheme('dark'),
                                    icon: <Moon />,
                                },
                                {
                                    label: 'System',
                                    onClick: () => setColorTheme('system'),
                                    icon: <Atom />,
                                },
                            ],
                        ]}
                        icon={nowColorTheme === 'light' ? <Sun /> : <Moon />}
                    >
                        {colorTheme.replace(/\b[a-z]/, (letter) => letter.toUpperCase())}
                    </ActionMenu>
                </Footer.Menu.Item>
                <Footer.Menu.Item>
                    © 2022 Opize Corp. <br />
                    오피즈 | 박현우
                </Footer.Menu.Item>
            </Footer.Menu>
        </Footer>
    );
}
