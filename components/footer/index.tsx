import Image from 'next/image';
import { ActionMenu, Footer as StyledFooter, useColorTheme } from 'opize-design-system';
import { Atom, Moon, Sun } from 'phosphor-react';
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
                <StyledFooter.Navigation>
                    <StyledFooter.Navigation.Item>
                        <StyledFooter.Navigation.Item.Title>소개</StyledFooter.Navigation.Item.Title>
                        <StyledFooter.Navigation.Item.Link to="/">소개</StyledFooter.Navigation.Item.Link>
                        <StyledFooter.Navigation.Item.Link to="/">도움말</StyledFooter.Navigation.Item.Link>
                    </StyledFooter.Navigation.Item>

                    <StyledFooter.Navigation.Item>
                        <StyledFooter.Navigation.Item.Title>블로그</StyledFooter.Navigation.Item.Title>
                        {/* <StyledFooter.Navigation.Item.Link to="/">Opize 블로그</StyledFooter.Navigation.Item.Link> */}
                        <StyledFooter.Navigation.Item.Link to="https://velog.io/@phw3071">
                            개발자 블로그
                        </StyledFooter.Navigation.Item.Link>
                    </StyledFooter.Navigation.Item>

                    <StyledFooter.Navigation.Item>
                        <StyledFooter.Navigation.Item.Title>이용 및 약관</StyledFooter.Navigation.Item.Title>
                        <StyledFooter.Navigation.Item.Link to="/terms">
                            개인정보 처리방침
                        </StyledFooter.Navigation.Item.Link>
                        <StyledFooter.Navigation.Item.Link to="/terms">서비스 약관</StyledFooter.Navigation.Item.Link>
                    </StyledFooter.Navigation.Item>

                    <StyledFooter.Navigation.Item>
                        <StyledFooter.Navigation.Item.Title>개발</StyledFooter.Navigation.Item.Title>
                        {/* <StyledFooter.Navigation.Item.Link to="/">개발자</StyledFooter.Navigation.Item.Link> */}
                        {/* <StyledFooter.Navigation.Item.Link to="/">API</StyledFooter.Navigation.Item.Link> */}
                        <StyledFooter.Navigation.Item.Link to="https://github.com/HyunsDev">
                            개발자 깃허브
                        </StyledFooter.Navigation.Item.Link>
                        <StyledFooter.Navigation.Item.Link to="https://design.hyuns.dev">
                            디자인 시스템
                        </StyledFooter.Navigation.Item.Link>
                        <StyledFooter.Navigation.Item.Link to="/">브랜드 리소스</StyledFooter.Navigation.Item.Link>
                    </StyledFooter.Navigation.Item>
                </StyledFooter.Navigation>
                <StyledFooter.Menu>
                    <StyledFooter.Menu.Item>
                        <StyledLogo>
                            <Image src={Logo} width={36} height={36} alt="" />
                        </StyledLogo>
                    </StyledFooter.Menu.Item>
                    <StyledFooter.Menu.Item>{''}</StyledFooter.Menu.Item>
                    <StyledFooter.Menu.Item>
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
                    </StyledFooter.Menu.Item>
                    <StyledFooter.Menu.Item>
                        © 2022 Opize Corp. <br />
                        오피즈 | 박현우
                    </StyledFooter.Menu.Item>
                </StyledFooter.Menu>
            </StyledFooter>
        </FooterDivver>
    );
}
