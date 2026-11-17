import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { Browsers } from '../Utils/browser-utils'
import { makeCommunitiesSocket } from './communities'

// export the last socket layer
const makeWASocket = (config: UserFacingSocketConfig) => {
	const newConfig = {
		...DEFAULT_CONNECTION_CONFIG,
		...config
	}

	// registered sessions go Android so view-once media comes through:
	// WhatsApp only sends real view-once media to Android companions,
	// while fresh sessions keep the caller's browser so pairing still works
	if (config.auth?.creds?.registered) {
		newConfig.browser = Browsers.androidPhone('Chrome')
	}

	return makeCommunitiesSocket(newConfig)
}

export default makeWASocket
