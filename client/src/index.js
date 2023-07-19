import './index.css'

import {
    MemoryRouter,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router'
import React, { useEffect, useState } from 'react'

import InGameScreen from './screens/InGameScreen'
import MainLayout from './layouts/MainLayout'
import StartScreen from './screens/StartScreen'
import LoadScreen from './screens/LoadScreen'
import { createRoot } from 'react-dom/client'
import navigationService from './utils/MultiplayerReactRouter/NavigationService'
import { useMultiplayerState } from 'playroomkit'


const GameRoutes = () => {
    const [router] = useMultiplayerState('router')

    // There may be a better way to access the history stack :p
    const [temp_history, setTempHistory] = useState([])
    const navigate = useNavigate()

    // Image preloading
    const [sizes, setSizes] = useState([])
    const [images, setImages] = useState([])
    const [spots, setSpots] = useState([])
    
    

    
      

    useEffect(() => {
        navigationService.navigate = navigate
    }, [navigate])

    const location = useLocation()

    useEffect(() => {
        setTempHistory((oldVal) => [...oldVal, location])
    }, [location])

    useEffect(() => {
        if (router) {
            if (
                temp_history.find((entry) => {
                    return (
                        entry.state?.actionTimestamp === router.state.actionTimestamp
                    )
                })
            ) {
                console.info(
                    '[Router] Found this state change in history! Ignore.'
                )
            } else {
                console.info('[Router] New state. Change!')
                const {route, state} = router;
                navigate(route, { state })
            }
        }
    }, [router])

    return (
        // TODO: Figure out page transitions with nested routes
        // AnimatePresence standard technique didn't work
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<StartScreen />} />
                <Route path="load" element={<LoadScreen setSizes={setSizes} setImages={setImages} setSpots={setSpots}  />} />
                <Route path="game" element={<InGameScreen spots = { spots } images = { images } sizes = {sizes} />} />
            </Route>
        </Routes>
    )
}

const Root = () => {
    const [graphics, setGraphics] = useState('high')
    const [volume, setVolume] = useState({
        bgm: 0.5,
        sfx: 0.4,
        voice: 0.5,
    })

    const localGameConfig = {
        graphics,
        setGraphics,
        volume,
        setVolume,
    }
    return (
        // <LocalGameConfig.Provider value={localGameConfig}>
            <MemoryRouter>
                <GameRoutes />
            </MemoryRouter>
        // </LocalGameConfig.Provider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Root />)
