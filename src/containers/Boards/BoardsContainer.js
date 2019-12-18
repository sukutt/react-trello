import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SideNav, GridPanel } from 'components/Boards';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import * as boardsActions from 'store/modules/boards';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';

const BoardsDiv = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`;

const StyledDrawer = styled(Drawer)`
    width: 240px;
    flexShrink: 0;
    > div {
        position: relative;
        border: none;
    }
`
const Main = styled.main`
    flex-grow: 1;
    padding: 10px;
`;

const Spacer = styled.div`
    height: 30px;
`;

class BoardsContainer extends Component {
    initBoards = async () => {
        const { BoardsActions } = this.props;
        const { email } = storage.get('signedInInfo');

        try {
            await BoardsActions.getBoards(email);
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.initBoards();
    }

    render() {
        const list = this.props.list.toJS();

        const favoriteList = list.filter(value => value.favorite);
        const personalList = list.filter(value => !value.favorite);

        return (
            <BoardsDiv>
                <StyledDrawer
                variant="permanent"
                >
                    <SideNav />
                </StyledDrawer>
                <Main>
                    {favoriteList.length > 0 ?
                        <React.Fragment>
                            <GridPanel isFavorite={true} boards={favoriteList}>
                                Favorite
                            </GridPanel>
                            <Spacer />
                        </React.Fragment> : ''
                    }
                    <GridPanel isFavorite={false} boards={personalList}>
                        Personal
                    </GridPanel>
                </Main>
            </BoardsDiv>
        )
    }
}

export default connect(
    (state) => ({
        list: state.boards.get('list')
    }),
    (dispatch) => ({
        BoardsActions: bindActionCreators(boardsActions, dispatch)
    })
)(BoardsContainer);
