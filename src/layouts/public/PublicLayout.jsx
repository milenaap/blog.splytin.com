import { FooterLayout } from "./FooterLayout"
import { HeaderLayout } from "./HeaderLayout"


export const PublicLayout = ({children}) => {
  return (
    <div className="bg-white">
    
        <HeaderLayout />

        {children}

        <FooterLayout />

    </div>

  )
}
