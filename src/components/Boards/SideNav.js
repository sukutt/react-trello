import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

export default function SideNav() {
    return (
        <div>
            <List>
            {['Boards'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon><DeveloperBoardIcon /></ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </div>
    )
}