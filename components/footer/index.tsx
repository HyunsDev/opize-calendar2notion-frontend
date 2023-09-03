import Image from 'next/image';
import { Menu, Footer as StyledFooter, useColorTheme } from 'opize-design-system';
import { Atom, Moon, Sun } from '@phosphor-icons/react';
import styled from 'styled-components';
import Logo from '../../assets/logo.png';

const StyledLogo = styled.div`
    width: 60px;
    height: 60px;
`;

const FooterDivver = styled.div`
    margin-top: 32px;
`;

export function Footer() {
    const { setColorTheme, nowColorTheme, colorTheme } = useColorTheme();

    return (
        <FooterDivver>
            <StyledFooter>
                <StyledFooter.Nav>
                    <StyledFooter.Nav.Item>
                        <StyledFooter.Nav.Title>소개</StyledFooter.Nav.Title>
                        <StyledFooter.Nav.A href="/about">소개</StyledFooter.Nav.A>
                        <StyledFooter.Nav.A href="/guide">도움말</StyledFooter.Nav.A>
                    </StyledFooter.Nav.Item>

                    <StyledFooter.Nav.Item>
                        <StyledFooter.Nav.Title>블로그</StyledFooter.Nav.Title>
                        <StyledFooter.Nav.A href="https://velog.io/@phw3071">개발자 블로그</StyledFooter.Nav.A>
                    </StyledFooter.Nav.Item>

                    <StyledFooter.Nav.Item>
                        <StyledFooter.Nav.Title>이용 및 약관</StyledFooter.Nav.Title>
                        <StyledFooter.Nav.A href="/terms">개인정보 처리방침</StyledFooter.Nav.A>
                        <StyledFooter.Nav.A href="/terms">서비스 약관</StyledFooter.Nav.A>
                    </StyledFooter.Nav.Item>

                    <StyledFooter.Nav.Item>
                        <StyledFooter.Nav.Title>개발</StyledFooter.Nav.Title>
                        <StyledFooter.Nav.A href="https://github.com/HyunsDev">개발자 깃허브</StyledFooter.Nav.A>
                        <StyledFooter.Nav.A href="https://design.opize.me">디자인 시스템</StyledFooter.Nav.A>
                    </StyledFooter.Nav.Item>
                </StyledFooter.Nav>
                <StyledFooter.Menu>
                    <StyledFooter.Menu.Item>
                        <StyledLogo>
                            <Image src={Logo} width={36} height={36} alt="" />
                        </StyledLogo>
                    </StyledFooter.Menu.Item>
                    <StyledFooter.Menu.Item>{''}</StyledFooter.Menu.Item>
                    <StyledFooter.Menu.Item>
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
                    </StyledFooter.Menu.Item>
                    <StyledFooter.Menu.Item>
                        © 2023 Opize Corp. <br />
                        오피즈 | 박현우
                    </StyledFooter.Menu.Item>
                </StyledFooter.Menu>
            </StyledFooter>
        </FooterDivver>
    );
}
