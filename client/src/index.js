import './index.css'

// import Main, { Loading } from './main'
import {
    MemoryRouter,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router'
import React, { useEffect, useState } from 'react'
import { isHost, useMultiplayerState } from 'playroomkit'

import Game from './game'
import InGameScreen from './screens/InGameScreen'
import MainLayout from './layouts/MainLayout'
import StartScreen from './screens/StartScreen'
// import GameSettingsScreen from './screens/GameSettings'
// import InGame from './screens/TimeAttack/InGame'
// import { LocalGameConfig } from './modules/LocalGameConfig'
// import StartScreen from './screens/Start'
// import WaitingForHostScreen from './screens/WaitingForHost'
import { createRoot } from 'react-dom/client'
import navigationService from './utils/MultiplayerReactRouter/NavigationService'

const GameRoutes = () => {
    const [router] = useMultiplayerState('router')

    // There may be a better way to access the history stack :p
    const [temp_history, setTempHistory] = useState([])
    const navigate = useNavigate()

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
                        entry.state?.actionTimestamp === router.actionTimestamp
                    )
                })
            ) {
                console.info(
                    '[Router] Found this state change in history! Ignore.'
                )
            } else {
                console.info('[Router] New state. Change!')
                const { props, actionTimestamp } = router
                navigate(router.state, { ...props, actionTimestamp })
            }
        }
    }, [router])

    return (
        // TODO: Figure out page transitions with nested routes
        // AnimatePresence standard technique didn't work
        <Routes>
            <Route path="/" element={<MainLayout />}>
                {/* <Route path="loading" element={<Loading />} /> */}
                <Route index element={<StartScreen />} />
                <Route path="game" element={<InGameScreen />} />
                {/* <Route
                    path="time-attack/new"
                    element={
                        isHost() ? (
                            <GameSettingsScreen />
                        ) : (
                            <WaitingForHostScreen />
                        )
                    }
                /> */}
                {/* <Route path="time-attack/game" element={<InGame />} /> */}
                {/* <Route
                    path="battle-royale/new"
                    element={
                        isHost() ? (
                            <GameSettingsScreen />
                        ) : (
                            <WaitingForHostScreen />
                        )
                    }
                /> */}
                {/* <Route path="battle-royale/game" element={<Game />} /> */}
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
