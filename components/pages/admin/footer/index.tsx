import Image from 'next/image';
import { Menu, Footer, useColorTheme } from 'opize-design-system';
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
            <Footer.Nav>
                <Footer.Nav.Item>
                    <Footer.Nav.Title>소개</Footer.Nav.Title>
                    <Footer.Nav.A href="/about">소개</Footer.Nav.A>
                    <Footer.Nav.A href="/guide">도움말</Footer.Nav.A>
                </Footer.Nav.Item>

                <Footer.Nav.Item>
                    <Footer.Nav.Title>블로그</Footer.Nav.Title>
                    {/* <Footer.Nav.A href="/">Opize 블로그</Footer.Nav.A> */}
                    <Footer.Nav.A href="https://velog.io/@phw3071">개발자 블로그</Footer.Nav.A>
                </Footer.Nav.Item>

                <Footer.Nav.Item>
                    <Footer.Nav.Title>이용 및 약관</Footer.Nav.Title>
                    <Footer.Nav.A href="/terms">개인정보 처리방침</Footer.Nav.A>
                    <Footer.Nav.A href="/terms">서비스 약관</Footer.Nav.A>
                </Footer.Nav.Item>

                <Footer.Nav.Item>
                    <Footer.Nav.Title>개발</Footer.Nav.Title>
                    <Footer.Nav.A href="/">개발자</Footer.Nav.A>
                    <Footer.Nav.A href="https://design.hyuns.dev">디자인 시스템</Footer.Nav.A>
                    <Footer.Nav.A href="/">브랜드 리소스</Footer.Nav.A>
                </Footer.Nav.Item>
            </Footer.Nav>
            <Footer.Menu>
                <Footer.Menu.Item>
                    <StyledLogo>
                        <Image src={Logo} width={36} height={36} alt="" />
                    </StyledLogo>
                </Footer.Menu.Item>
                <Footer.Menu.Item>{''}</Footer.Menu.Item>
                <Footer.Menu.Item>
                    <Menu>
                        <Menu.Trigger variant="secondary" suffix={nowColorTheme === 'light' ? <Sun /> : <Moon />}>
                            {colorTheme.replace(/\b[a-z]/, (letter) => letter.toUpperCase())}
                        </Menu.Trigger>
                        <Menu.Content>
                            <Menu.Option onClick={() => setColorTheme('light')} suffix={<Sun />}>
                                Light
                            </Menu.Option>
                            <Menu.Option onClick={() => setColorTheme('dark')} suffix={<Moon />}>
                                Dark
                            </Menu.Option>
                            <Menu.Option onClick={() => setColorTheme('system')} suffix={<Atom />}>
                                System
                            </Menu.Option>
                        </Menu.Content>
                    </Menu>
                </Footer.Menu.Item>
                <Footer.Menu.Item>
                    © 2022-2023 Opize Corp. <br />
                    오피즈 | 박현우
                </Footer.Menu.Item>
            </Footer.Menu>
        </Footer>
    );
}
