import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

class Home extends React.Component {
    render() {
        return (
        <React.Fragment>
            <CssBaseline />
            <StyledAppBar position="static">
                <Toolbar>
                    <Title variant="h6">
                        Trello
                    </Title>
                    <Button color="inherit">Login</Button>
                    <SignUpButton color="inherit">Sign up</SignUpButton>
                </Toolbar>
            </StyledAppBar>
            <MainBody >
                <MainGrid container justify="center" spacing={3}>
                    <TypoGrid item xs={6}>
                        <TitleTypo component="h1" variant="h3" align="left" gutterBottom>
                            Trello lets you work more collaboratively and get more done.
                        </TitleTypo>
                        <ParagraphTypo align="left" gutterBottom>
                            Trello’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.
                        </ParagraphTypo> 
                    </TypoGrid>
                    <ImageGrid item xs={6}>
                        <ImageBox/>
                    </ImageGrid>
                </MainGrid>
            </MainBody>
        </React.Fragment>
        )
    }
}

const MainGrid = styled(Grid)`
    padding: 40px;
`;

const TypoGrid = styled(Grid)`
    padding-top: 80px !important;
    flex: 0 0 31.66666667% !important;
    max-width: 31.66666667% !important;
`;

const TitleTypo = styled(Typography)`
    color: white;
    font-weight: 500;
    line-height: 1.2 !important;
`;

const ParagraphTypo = styled(Typography)`
    color: white;
    font-size: 1.5rem !important;
    line-height: 1.5 !important;
`;

const ImageGrid = styled(Grid)`
    flex: 0 0 50% !important;
    max-width: 50% !important;
`
const ImageBox = styled(Box)`
    background: url(images/main.svg) !important;
    max-width: 100% !important;
    width: 582px;
    height: 441px;
    vertical-align: middle !important;
`;

const StyledAppBar = styled(AppBar)`
    position: fixed !important;
    background-color: transparent !important;
`;

const MainBody = styled.section`
    position: fixed;
    padding-top: 100px;
    background: linear-gradient(135deg, #0079bf, #5067c5);
    width: 100%;
    height: 100%;
`;

const SignUpButton = styled(Button)`
    background-color: white !important;
    color: #3f51b5 !important;
    margin-left: 5px !important;
`;

const Title = styled(Typography)`
    flex-grow: 1;
`;

export default Home;