import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

const BoardMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    left: 0;
    bottom: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

const BoardMenuTabContent = styled.div`
    background-color: rgb(22, 24, 25);
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow: hidden;
`;

const BoardMenuHeader = styled.div`
    opacity: 1;
    overflow: visible;
    transition: auto;
    box-sizing: border-box;
    flex: 0 0 auto;
    height: 48px;
    padding: 0 6px 0 12px;
    position: relative;
    width: 100%;
`;
const BoardHeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const HeaderTitle = styled.h3`
    line-height: 20px;
    margin: 14px 32px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    transition: margin .12s ease-in;
    white-space: nowrap;
    flex: 1;
    color: rgb(213, 210, 203);
    font-size: 16px;
    font-weight: 600;
`

const CloseButton = styled(Icon)`
    margin-left: 8px;
    cursor: pointer;
    color: rgb(176, 193, 210);

    &:hover {
        color: white;
    }
`;

const HorizontalDivider = styled.hr`
    margin: 0;
    border: 0;
    height: 1px;
    padding: 0;
    width: 100%;
`;

const BoardMenuContent = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 12px 6px 12px 12px;
    width: 100%;
    height: 100%;
`;

const BoardMenuContentFrame = styled.div`
    transition-property: transform,opacity;
    transition-duration: .12s;
    transition-timing-function: ease-in;
    transform: translateX(0);
    flex: 1 auto;
    width: 100%;
`;

const BoardMenuNavigation = styled.ul`
    margin: 4px 0;
    list-style: none;
    padding: 0;
`;

const BoardMenuNavigationItem = styled.li`
    cursor: pointer;
`;

const BoardMenuNavigationItemLink = styled.a`
    text-decoration-color: initial;
    border-radius: 3px;
    display: block;
    font-weight: 600;
    line-height: 20px;
    text-decoration: none;
    padding: 6px 6px 6px 40px;
    position: relative;
    color: rgb(213, 210, 203);

    &:hover {
        color: white;
    }
`;

class CardPopper extends Component {
    render() {
        const { children } = this.props;

        return (
            <BoardMenuContainer>
                <BoardMenuTabContent>
                    <BoardMenuHeader>
                        <BoardHeaderContent>
                            <HeaderTitle>
                                Menu
                            </HeaderTitle>
                            <CloseButton>
                                close
                            </CloseButton>
                        </BoardHeaderContent>
                        <HorizontalDivider />
                    </BoardMenuHeader>
                    <BoardMenuContent>
                        <BoardMenuContentFrame>
                            <BoardMenuNavigation>
                                <BoardMenuNavigationItem>
                                    <BoardMenuNavigationItemLink>
                                        Close Board...
                                    </BoardMenuNavigationItemLink>
                                </BoardMenuNavigationItem>
                            </BoardMenuNavigation>
                        </BoardMenuContentFrame>
                    </BoardMenuContent>
                </BoardMenuTabContent>
            </BoardMenuContainer>
        );
    }
}

export default CardPopper;