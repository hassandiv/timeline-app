import React, { useState } from 'react'
import styled from 'styled-components'
import TimeLine from './components/TimeLine'
import Sidebar from './components/Sidebar'
import img from './img/wallpaper.jpeg'

//CSS
const StyledMain = styled.main`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    background-color: #000;
`
const StyledAside = styled.aside<IWidth>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    min-height: 100%;
    width: ${props => props.desktopWidth};
    max-width: 100%;
    transition: 0.5s all;
    overflow: hidden;
    background-color: #131313;
    @media(max-width: 1280px) {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }
    @media(max-width: 800px) {
        min-width: ${props => props.resWidth};
        &:after {
            width: ${props => props.resWidth};
        }
    }

`
const StyledIcon = styled.img`
    position: absolute;
    top: 35px;
    left: 35px;
    width: 40px;
    height: auto;
    cursor: pointer;
    z-index: 11;
    @media(max-width: 1024px) {
        left: auto;
        right: 35px;
    }
    @media(max-width: 450px) {
        top: 15px;
        right: 15px;
        width: 30px;
    }
`
const StyledSection = styled.section<IWidth>`
    height: 100%;
    width: ${props => props.desktopWidth};
    max-width: 100%;
    margin: 0 auto;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    z-index: 9;
    @media(max-width: 1280px) {
        width: ${props => props.resWidth};
    }
`
const StyledImage = styled.img`
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 8;
    @media(max-width: 1280px) {
        display: none;
    }
`

//TypeScript
type IWidth = {
    desktopWidth: string
    resWidth: string
}

type IEvents = {
    title: string
    description: string
    time: string
    id: number
}[]

const Home = () => {

  const [isOpen, setIsOpen] = useState<boolean>(true)
    const [events, setEvents] = useState<IEvents>([
        { title: 'How it works?', description: 'A new event will be added every 5 seconds until the total events is 4.', time: '13:00 - 30 Oct', id: 1 },
        { title: 'How to add a new event?', description: 'Wait untill all events added, then add a new event using the form on the sidebar.', time: '13:35 - 30 Oct', id: 2 },
        { title: 'How to remove an event?', description: 'Hover over over an event click on the remove button and it should be removed.', time: '16:10 - 30 Oct', id: 3 },
        { title: 'Events order from bottom to top.', description: 'The most recent event is added to the top with date and time.', time: '17:30 - 30 Oct', id: 4 },    
    ])

    return (
      <StyledMain>
            <StyledIcon
                onClick={() => setIsOpen(!isOpen)}
                alt="sidebar icon"
                src="/menu.png"
            />
            <StyledAside
                desktopWidth={isOpen ? '400px' : '0px'}
                resWidth={isOpen ? '100%' : '0px'}
            >
                <Sidebar
                    eventsProps={events}
                    setEventsProps={setEvents}
                />
            </StyledAside>
            <StyledSection
                desktopWidth={isOpen ? 'calc(100% - 400px)' : '100%'}
                resWidth={isOpen ? '100%' : '100%'}
            >
                <TimeLine
                    props={events}
                    setEventsProps={setEvents}
                />
            </StyledSection>
            <StyledImage alt="timeline image" src="./bg.png" />
        </StyledMain>
    )
}

export default Home
