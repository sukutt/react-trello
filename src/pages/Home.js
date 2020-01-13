import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';

class Home extends React.Component {
    render() {
        return (
            <MainBody >
                <MainGrid container justify="center" spacing={3}>
                    <TypoGrid item xs={6}>
                        <TitleTypo component="h1" variant="h3" align="left" gutterBottom>
                            This is fake trello project!
                        </TitleTypo>
                        <ParagraphTypo align="left" gutterBottom>
                            Frello’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.
                        </ParagraphTypo> 
                    </TypoGrid>
                    <ImageGrid item xs={6}>
                        <ImageBox/>
                    </ImageGrid>
                </MainGrid>
            </MainBody>
        )
    }
}

const MainGrid = styled(Grid)`
    padding: 40px;
`;

const TypoGrid = styled(Grid)`
    &&& {
        padding-top: 80px;
        flex: 0 0 31.66666667%;
        max-width: 31.66666667%;
    }
`;

const TitleTypo = styled(Typography)`
    color: white;
    font-weight: 500;

    &&& {
        line-height: 1.2;
    }
`;

const ParagraphTypo = styled(Typography)`
    color: white;
    &&& {
        font-size: 1.5rem;
        line-height: 1.5;
    }
`;

const ImageGrid = styled(Grid)`
    &&& {
        flex: 0 0 50%;
        max-width: 50%;
    }
`
const ImageBox = styled(Box)`
    &&& {
        background: url(images/main.svg);
        max-width: 100%;
        vertical-align: middle;
    }
    width: 582px;
    height: 441px;
`;

const MainBody = styled.div`
    position: fixed;
    padding-top: 100px;
    background: linear-gradient(135deg, #0079bf, #5067c5);
    width: 100%;
    height: 100%;
`;

export default Home;