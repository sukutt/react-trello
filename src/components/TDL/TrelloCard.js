import React from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Icon, Popover, Button, CardContent, Typography, Card } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

const TrelloCard = ({
    content,
    id,
    index,
    handleEditCard,
}) => {
    const useStyles = makeStyles(theme => ({
        iconStyle: {
          verticalAlign: 'text-bottom',
        },
    }));

    const handleFocus = (e) => {
        if (show) {
            e.target.select();
            setShow(false);
        }
    }

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleClick = (target) => {
        setText(content);
        setShow(true);
        setAnchorEl(target);
    }

    const handleClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [show, setShow] = React.useState(false);
    const [text, setText] = React.useState('');
    const open = Boolean(anchorEl);
    const classes = useStyles();

    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <StyledCard onClick={(e) => {
                        handleClick(e.currentTarget);
                    }}>
                        <CardEditButton onClick={(e) => {
                            handleClick(e.currentTarget.parentElement);
                        }}>
                            <EditIcon>edit</EditIcon>
                            <Popover
                                PaperProps={{
                                    style: {
                                        overflow: 'visible',
                                        height: '180px',
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
                                        value={text}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        autoFocus
                                    />
                                </div>
                                <SaveCardButton 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // 수정된 텍스트 및 카드 id
                                        handleEditCard(text);
                                        setAnchorEl(null);
                                    }}
                                    variant="contained">
                                        SAVE
                                </SaveCardButton>
                                <EditFormFloatDiv>
                                    <EditFormButton variant="contained" size="small">
                                        <DeleteOutline className={classes.iconStyle} fontSize="small" />
                                        Archive
                                    </EditFormButton>
                                    <EditFormButton variant="contained" size="small">
                                        <DeleteOutline className={classes.iconStyle} fontSize="small" />
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
        clear: 'both',
        margin: '0px 0px 4px 8px',
        textTransform: 'none',
        display: 'block',
        float: 'left',
        '&:hover': {
            fontWeight: 900,
            backgroundColor: 'rgba(0,0,0,.3)',
            transition: 'transform 0.3s',
            transform: 'translateX(4px)',
        },
    },
})(Button);

const EditFormFloatDiv = styled.div`
    left: 100%;
    position: absolute;
    top: 0;
    width: 240px;
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
