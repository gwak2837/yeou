'use client'

import Script from 'next/script'

import { NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY } from '../common/constants'

const channelTalkScript = `!function(){var e=window;if(e.ChannelIO)return(window.console.error||window.console.log||function(){})("ChannelIO script included twice.");var n=function(){n.c(arguments)};function t(){if(!e.ChannelIOInitialized){e.ChannelIOInitialized=!0;var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://cdn.channel.io/plugin/ch-plugin-web.js",n.charset="UTF-8";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(n,t)}}n.q=[],n.c=function(e){n.q.push(e)},e.ChannelIO=n,"complete"===document.readyState?t():window.attachEvent?window.attachEvent("onload",t):(window.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1))}(),ChannelIO("boot",{pluginKey:"${NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY}"});`

export function bootChanneltalk(option: Record<string, any>) {
  window.ChannelIO('shutdown')
  window.ChannelIO('boot', option)
}

export default function ChannelTalk() {
  return <Script id="channel-talk">{channelTalkScript}</Script>
}
