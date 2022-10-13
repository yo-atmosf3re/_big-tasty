import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = () => (
   <ContentLoader
      speed={5}
      width={270}
      height={525}
      viewBox="0 0 270 525"
      backgroundColor="#e2e2e2"
      foregroundColor="#d6d6d6"
   >
      <rect x="7" y="411" rx="15" ry="15" width="88" height="27" />
      <rect x="118" y="400" rx="20" ry="20" width="150" height="44" />
      <rect x="9" y="297" rx="12" ry="12" width="259" height="94" />
      <rect x="12" y="257" rx="12" ry="12" width="252" height="30" />
      <circle cx="133" cy="130" r="110" />
   </ContentLoader>
)