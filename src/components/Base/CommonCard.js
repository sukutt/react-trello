import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

const BoardMenuTabContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow: hidden;
`;

const BoardMenuHeader = styled.div`
    overflow: visible;
    transition: auto;
    box-sizing: border-box;
    flex: 0 0 auto;
    height: 40px;
    padding: 0 6px 0 6px;
    position: relative;
    width: 100%;
`;
const BoardHeaderContent = styled.div`
    height: 40px;
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
    color: #172b4d;
    font-size: 14px;
    font-weight: 400;
`

const CloseButton = styled(Icon)`
    margin-left: 8px;
    cursor: pointer;
    color: #6b778c;
    opacity: .8;

    &:hover {
        opacity: 1;
    }
`;

const HorizontalDivider = styled.hr`
    margin: 0;
    border: 0;
    border-bottom: 1px solid rgba(9,30,66,.13);
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
    padding: 6px 6px 12px 6px;
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
    margin: 0;
    list-style: none;
    padding: 0;

    &:not(:last-child) {
        border-bottom: 1px solid rgba(9,30,66,.13);
    }
`;

const BoardMenuNavigationItem = styled.li`
    margin: 2px 0;
    cursor: pointer;
    padding: 8px;
    &:hover {
        background-color: #f2f2f2;
    }
`;

const BoardMenuNavigationItemLink = styled.a`
    text-decoration-color: initial;
    border-radius: 3px;
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-decoration: none;
    position: relative;
    color: #172b4d;
`;

class CardPopper extends Component {
    render() {
        const { actionList } = this.props;

        return (
            <div>
                <BoardMenuTabContent>
                    <BoardMenuHeader>
                        <BoardHeaderContent>
                            <HeaderTitle>
                                List Actions
                            </HeaderTitle>
                            <CloseButton
                                fontSize="small"
                            >
                                close
                            </CloseButton>
                        </BoardHeaderContent>
                        <HorizontalDivider />
                    </BoardMenuHeader>
                    <BoardMenuContent>
                        <BoardMenuContentFrame>
                            {actionList.map((list, index) => {
                                return (
                                    <BoardMenuNavigation
                                    key={index}>
                                        {list.map((item, index) => {
                                            return (
                                                <BoardMenuNavigationItem
                                                key={index}
                                                >
                                                    <BoardMenuNavigationItemLink onClick={item.fn}>
                                                        {item.caption}
                                                    </BoardMenuNavigationItemLink>
                                                </BoardMenuNavigationItem>
                                            )
                                        })}
                                    </BoardMenuNavigation>
                                )
                            })}
                        </BoardMenuContentFrame>
                    </BoardMenuContent>
                </BoardMenuTabContent>
            </div>
        );
    }
}

export default CardPopper;