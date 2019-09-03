import React from 'react';
import Textarea from 'react-textarea-autosize';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { withStyles } from '@material-ui/core/styles';
import { Icon, Popover, Button, CardContent, Typography, Card } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

const TrelloCard = ({
    content,
    id,
    index,
    onEditCard,
}) => {
    function handleClick(e) {
        setAnchorEl(e.currentTarget.parentElement);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <StyledCard>
                        <CardEditButton onMouseDown={handleClick}>
                            <EditIcon>edit</EditIcon>
                            <Popover
                                PaperProps={{
                                    style: {
                                        height: '180px',
                                        width: '500px',
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        borderRadius: 0,
                                    }
                                }}
                                BackdropProps={{
                                    style: {
                                        backgroundColor: 'rgba(0,0,0,.64)'
                                    }
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <div>
                                    <TextArea 
                                        autoFocus
                                    />
                                </div>
                                <SaveCardButton onMouseDown={(e) => {
                                }} variant="contained">SAVE</SaveCardButton>
                                <EditFormFloatDiv>
                                    <EditFormButton variant="contained" size="small">
                                        <DeleteOutline fontSize="small" />
                                        Archive
                                    </EditFormButton>
                                </EditFormFloatDiv>
                            </Popover>
                        </CardEditButton>
                        <StyledCardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {content}
                            </Typography>
                        </StyledCardContent>
                    </StyledCard>
                </div>
            )}
        </Draggable>
    )
}

const EditFormButton = withStyles({
    root: {
        background: 'rgba(0,0,0,.3)',
        fontSize: '14px',
        color: 'white',
        textTransform: 'none',
        '&:hover': {
            fontWeight: 900,
            backgroundColor: 'rgba(0,0,0,.3)',
            '& span': {
                transition: 'transform 0.5s',
                transform: 'translateX(4px)',
            }
        },
    },
  })(Button);

const EditFormFloatDiv = styled.div`
    left: 100%;
    position: absolute;
    top: 0;
    width: 240px;
    transform: translateX(-210px);
`;

const SaveCardButton = styled(Button)`
    color: white !important;
    background-color: #5aac44 !important;
    margin-top: 12px !important;
    padding: 6px 24px !important;
`;

const TextArea = styled(Textarea)`
    resize: none;
    width: 280px;
    height: 120px !important;
    overflow: hidden;
    outline: none;
    border: none;
    border-radius: 3px;
`;

const EditIcon = styled(Icon)`
    font-size: 1.2rem !important;
`;

const CardEditButton = styled.span`
    position: absolute;
    font-size: 11px;
    right: 2px;
    top: 5px;
    padding: 4px;
    opacity: .8;
    background-color: #f4f5f7;
    visibility: hidden;
    border-radius: 3px;

    &:hover {
        background-color: #ebecf0;
        opacity: 1;
    }
`;

const StyledCard = styled(Card)`
    position: relative;
    max-width: 300px;
    min-height: 20px;
    display: block;
    margin-bottom: 8px;

    &:hover {
        background-color: #f4f5f7;
        ${CardEditButton} {
            visibility: visible;
        }
    }
`;

const StyledCardContent = styled(CardContent)`
    padding: 10px 10px 0px 10px !important;
`;

export default TrelloCard;
