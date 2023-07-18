import React, { useState } from 'react'

import RulesModal from '../components/modals/RulesModal';
import StaticButton from '../components/buttons/StaticButton'
import { navigate } from '../utils/MultiplayerReactRouter'

const StartScreen = () => {
  const [showRulesModal, setShowRulesModal] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center">
        <div className='text-white font-ps2p text-6xl sm:text-9xl'>
          spot
        </div>
        <div className="flex flex-col mt-28 sm:flex-row">
          <StaticButton
            onClick={() => navigate("load")}
            text="START"
          />
          <StaticButton
            onClick={() => setShowRulesModal(true)}
            text="Rules"
        />
        </div>
        {showRulesModal && <RulesModal
          handleBackClick={() => setShowRulesModal(false)}
          closeOnClickOutside
        />}
    </div>
  )
}

export default StartScreen