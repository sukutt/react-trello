import React from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Icon, Popover, Button } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

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
    &&& {
        color: white;
        background-color: #5aac44;
        margin-top: 12px;
        padding: 6px 24px;
    }
`;

const TextAreaContainer = styled.div`
    width: 248px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    position: relative;
`;

const TextAreaFrame = styled.div`
    overflow: hidden;
    padding: 6px 8px 2px;
    position: relative;
`;

const TextArea = styled(Textarea)`
    resize: none;
    min-height: 90px;
    width: 100%;
    overflow: hidden;
    outline: none;
    border: none;
    border-radius: 3px;
`;

const CardEditButton = styled.span`
    position: absolute;
    font-size: 11px;
    right: 2px;
    top: 3px;
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

const EditIcon = styled(Icon)`
    &&& {
        font-size: 1rem;
    }
`;

const TrelloCardContainer = styled.div`
    &&& {
        display: block;
        cursor: pointer;
    }
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
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

const StyledCard = styled.div`
    position: relative;
    overflow: hidden;
    padding: 6px 8px 2px; 
`;

const StyledCardContent = styled.span`
    clear: both;
    display: block;
    margin: 0 0 4px;
    overflow: hidden;
    text-decoration: none;
    word-wrap: break-word;
    color: #172b4d;
`;

const TrelloCard = ({
    content,
    id,
    index,
    handleEditCard,
    handleDeleteCard,
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
        <Draggable draggableId={id} index={index}>
            {provided => (
                <TrelloCardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                                <TextAreaContainer>
                                    <TextAreaFrame>
                                        <TextArea
                                            value={text}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            autoFocus
                                        />
                                    </TextAreaFrame>
                                </TextAreaContainer>
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
                                    <EditFormButton variant="contained" size="small" onClick={handleDeleteCard}>
                                        <DeleteOutline className={classes.iconStyle} fontSize="small" />
                                        Archive
                                    </EditFormButton>
                                </EditFormFloatDiv>
                            </Popover>
                        </CardEditButton>
                        <StyledCardContent dir="auto">
                            {content}
                        </StyledCardContent>
                    </StyledCard>
                </TrelloCardContainer>
            )}
        </Draggable>
    )
}

export default TrelloCard;
