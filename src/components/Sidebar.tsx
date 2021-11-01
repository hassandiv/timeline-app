import React, { FC, useState } from 'react'
import styled from 'styled-components'
import css from '../img/css.png'
import jsx from '../img/jsx.png'
import react from '../img/react.png'
import typescript from '../img/typescript.png'

//CSS
const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 330px;
    padding: 0px 35px;
    margin: 100px 0 50px auto;
    z-index: 9;
    @media(max-width: 800px) {
        margin: 50px 0;
    }
    @media(max-width: 450px){
        margin: 50px 0;
    }
    @media(max-width: 320px) and (max-height: 568px) {
        width: 300px;
        margin: 20px 0;
    }
`
const StyledH1 = styled.h1`
    font-size: 30px;
    color: #ffc100;
`
const StyledP = styled.p`
    font-size: 17px;
    color: #fff;
    margin-bottom: 0px;
`
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 330px;
    height: 200px;
    padding: 0px 35px;
    margin: 0 auto;
    z-index: 9;
    @media(max-width: 800px) {
        margin: 0px;
    }
    @media(max-width: 320px) and (max-height: 568px) {
        width: 300px;
    }
`
const StyledInput = styled.input`
    padding: 10px;
    border: 0px;
    border-radius: 5px;
    &:focus {
        outline: none;
    }
`
const StyledTextarea = styled.textarea`
    padding: 10px;
    height: 80px;
    border: 0px;
    border-radius: 5px;
    resize: none;
    &:focus {
        outline: none;
    }
`
const StyledButton = styled.button`
    padding: 10px;
    border: 1px solid #ffc100;
    border-radius: 5px;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    background-color: transparent;
    color: #ffc100;
    cursor: pointer;
    transition: 0.5s all;
    &:hover {
        background-color: #ffc100;
        color: #000;
    }
`
const StyledLogo = styled.img`
    width: 35px;
    height: auto;
    filter: invert(1);
`
const StyledLogoJsx = styled.img`
    width: 43px;
    height: auto;
`
const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 250px;
`

//TypeScript
type IEventsProps = {
    title: string
    description: string
    time: string
    id: number
}[]

type newEventsProps = {
    eventsProps: IEventsProps
    setEventsProps: React.Dispatch<React.SetStateAction<IEventsProps>>
}

const Sidebar: FC<newEventsProps> = ({ eventsProps, setEventsProps }) => {

    const zeroPad = (number: number) => number.toString().length === 1 ? `0${number}` : number
    const date = new Date()
    const [day, month] =[zeroPad(date.getDate()), date.toLocaleString('default', { month: 'short' })]
    const [hour, minutes] = [zeroPad(date.getHours()), zeroPad(date.getMinutes())]
    const timeDate = `${hour}:${minutes} - ${day} ${month}`

    const [ input, setInput ] = useState({
        title: '',
        description: '',
    })
    const { title, description } = input

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e:  React.MouseEvent<HTMLButtonElement>): null | undefined => {
        e.preventDefault() //prevent form OR required attributes
        if (!title || !description) { 
            return null
        }
        //copy of the existing array before adding new events
        setEventsProps([ ...eventsProps, {
                title: title, 
                description: description,
                time: timeDate,
                id: eventsProps.length + 1
            }
        ])
        //clear inputs after submit
        setInput({
            title: '',
            description: '',
        })
    }

    return (
        <React.Fragment>
            <StyledSection>
                <StyledH1>Timeline App</StyledH1>
                <StyledDiv>
                    <StyledLogo src={react} />
                    <StyledLogo src={typescript} />
                    <StyledLogoJsx src={jsx} />
                    <StyledLogo src={css} />
                </StyledDiv>
                <StyledP>All events are sorted by time/date from bottom to top.</StyledP>
                <StyledP>Use the form below to add a new event. Hover over an event to delete it.</StyledP>
            </StyledSection>
            <StyledForm>
                <StyledInput
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Enter Title"
                    onChange={handleChange}
                    //required
                />
                <StyledTextarea
                    name="description"
                    value={description}
                    placeholder="Enter Description"
                    onChange={handleChange}
                    //required
                />
                <StyledButton
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </StyledButton>
            </StyledForm>
        </React.Fragment>
    )
}
export default Sidebar