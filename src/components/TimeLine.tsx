import React, { FC, useState, useEffect, useRef } from 'react'
import styled, {keyframes} from 'styled-components'

const StyledUl = styled.ul<LiHeight>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    margin-bottom: auto;
    margin-top: auto;
    min-height: 95%;
    width: 900px;
    transition: 0.5s all;
    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        right: 50%;
        bottom: 0;
        margin-bottom: auto;
        margin-top: auto;
        width: 7px;
        min-height: ${props => props.timeLineHeight};
        background-color: #ffc100;
        border-radius: 3px;
    }
    @media(max-width: 900px) {
        width: 600px;
        &:after {
            left: 0;
            right: auto;
        }
    }
    @media(max-width: 650px) {
        width: 500px;
    }
    @media(max-width: 550px) {
        width: 450px;
    }
    @media(max-width: 540px) and (max-height: 720px) {
        width: 500px;
    }
    @media(max-width: 450px) {
        width: 414px;
        &:after {
            left: 22px;
            right: auto;
        }
    }
    @media(max-width: 375px) {
        width: 375px;
    }
    @media(max-width: 360px) and (max-height: 640px){
        width: 360px;
    }
    @media(max-width: 320px) and (max-height: 568px) {
        width: 320px;
    }
`
const StyledSpan = styled.span`
    font-size: 22px;
    opacity: 0;
    position: absolute;
    top: 7px;
    left: 170px;
    transition: 0.5s all;
    cursor: pointer;
    &:after {
        content: "✘";
    }
    &:hover {
        color: #ffc100;
        opacity: 1;
    }
    @media(max-width: 800px) {
        left: auto;
        right: 100px;
    }
`
const StyledLi = styled.li`
    position: relative;
    list-style: none;
    color: #fff;
    margin: 10px;
    padding: 10px;
    width: 330px;
    height: auto;
    word-wrap: break-word;
    transition: 0.5s all;
    &:nth-child(odd) {
        right: 221px;
        text-align: right;
        &:after {
            content: "";
            position: absolute;
            top: 10px;
            right: -62px;
            margin: 0 auto;
            width: 25px;
            height: 25px;
            background-color: #ffc100;
            border-radius: 100%;
            z-index: 1;
        }
    }
    &:nth-child(even) {
        left: 221px;
        text-align: left;
        &:after {
            content: "";
            position: absolute;
            top: 10px;
            left: -55px;
            margin: 0 auto;
            width: 25px;
            height: 25px;
            background-color: #ffc100;
            border-radius: 100%;
            z-index: 1;
        }
    }
    &:hover {
        background-color: #131313;
        padding: 10px;
        border-radius: 5px;
    }
    &:hover ${StyledSpan}{
        opacity: 1;
    }
    @media(max-width: 900px) {
        width: 500px;
        &:nth-child(odd) {
            left: 0;
            right: auto;
            text-align: left;
            &:after {
                left: -49.5px;
                right: auto;
            }
        }
        &:nth-child(even) {
            left: 0;
            text-align: left;
            &:after {
                left: -49.5px;
            }
        }
    }
    @media(max-width: 650px) {
        width: 415px;
        &:nth-child(odd) {
            &:after {
                left: -41.5px;
            }
        }
        &:nth-child(even) {
            &:after {
                left: -41.5px;
            }
        }
    }
    @media(max-width: 540px) and (max-height: 720px) {
        width: 415px;
    }
    @media(max-width: 450px) {
        width: 300px;
        &:nth-child(odd) {
            &:after {
                left: -34.5px;
            }
        }
        &:nth-child(even) {
            &:after {
                left: -34.5px;
            }
        }
    }
    @media(max-width: 411px) and (max-height: 823px) {
        &:nth-child(odd) {
            &:after {
                left: -32.5px;
            }
        }
        &:nth-child(even) {
            &:after {
                left: -32.5px;
            }
        }
    }
    @media(max-width: 375px) and (max-height: 812px) {
        width: 270px;
        &:nth-child(odd) {
            left: 3px;
        }
        &:nth-child(even) {
            left: 3px;
        }
    }
    @media(max-width: 360px) and (max-height: 640px){
        &:nth-child(odd) {
            left: 10px;
        }
        &:nth-child(even) {
            left: 10px;
        }
    }
    @media(max-width: 320px) and (max-height: 568px) {
        width: 220px;
        &:nth-child(odd) {
            left: 4px;
        }
        &:nth-child(even) {
            left: 4px;
        }
    }
}
`
const StyledTime = styled.span`
    color: #ffc100;
`
const StyledH2 = styled.h2`
    font-size: 27px;
    @media(max-width: 450px) {
        font-size: 22px;
    }
`
const StyledP = styled.p`
    font-size: 16px;
`

type IEventsProps = {
    title: string
    description: string
    time: string
    id: number
}[]

type newEventsProps = {
    props: IEventsProps
    setEventsProps: React.Dispatch<React.SetStateAction<IEventsProps>>
}

type IEventProps = {
    title: string
    description: string
    time: string
    id: number
}

type LiHeight = {
    timeLineHeight: string
}


const TimeLine: FC<newEventsProps> = ({ props, setEventsProps }) => {

    //set timeline height
    const ref: any = useRef<HTMLLIElement | null>(null)

    const [liHeight, setLiHeight] = useState<number>(0)

    useEffect((): void => {
        setLiHeight(ref?.current?.offsetTop + ref?.current?.offsetHeight)
    })

    //new array + handleremove event
    const revEvents = [...props].reverse()

    const handleRemoveItem = (idx: number): void => {
        revEvents.splice(idx, 1)
        setEventsProps(revEvents.reverse()) //update my original props with its original order 
    }

    //.slice makes a new array and slice out 6 itteration + load more events after 5 seconds .slice(0, i + 0) start from itteration 0 then add 1 (0, 1), (0, 2) ..etc
    useEffect(() => {
        let ms: number = 5000
        let i: number = 0
        let displayedEvents: IEventsProps = props.slice(6)
        setEventsProps(displayedEvents)
            const interval: NodeJS.Timeout = setInterval((): void => {
                if (++i <= props.length) {
                    displayedEvents = props.slice(0, i + 0)
                    setEventsProps(displayedEvents)
                }
            }, ms)
        return () => { clearInterval(interval) }
    }, [])

    return (
        
        <StyledUl
            timeLineHeight={`${props.length > 4 ? `${liHeight}px` : '95%'}`}
        >
            {revEvents.length > 0 && revEvents.map((entry: IEventProps, idx: number) => {
                return (
                    <StyledLi key={entry.id} ref={ref}>
                    <StyledSpan onClick={() => handleRemoveItem(idx)}></StyledSpan>
                    <StyledTime>{entry.time}</StyledTime>
                    <StyledH2>{entry.title}</StyledH2>
                    <StyledP>{entry.description}</StyledP>
                </StyledLi>
            )})}
        </StyledUl>
    )
}
export default TimeLine