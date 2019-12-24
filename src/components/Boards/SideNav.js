import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import styled from 'styled-components';

const NavBarItem = styled(({selected, ...rest}) => <ListItem {...rest} />)`
    && {
        background-color: ${props => {
            return props.selected ? '#e0e0e0' : 'transparent'
        }};
    }
`

export default function SideNav() {
    return (
        <div>
            <List>
            {['Boards'].map((text, index) => (
                <NavBarItem selected={true} button key={text}>
                    <ListItemIcon><DeveloperBoardIcon /></ListItemIcon>
                    <ListItemText primary={text} />
                </NavBarItem>
            ))}
            </List>
        </div>
    )
}