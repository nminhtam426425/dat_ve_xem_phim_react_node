import Avatar from "./Avatar"
import AsideProfile from "./AsideProfile"
import MyVoucher from "./MyVoucher"

const ContentHistory = ({userInfo, avatar, setAvatar, imageInput, setConfirm}) => {

    let propsOfAvatar = {
        userInfo,
        avatar, 
        setAvatar, 
        imageInput, 
        setConfirm
    }

    return <main className="w-full bg-background2">
        <Avatar {...propsOfAvatar}/>

        <div className="max-w-container-max mx-auto px-gutter py-12">
            <div className="flex flex-col lg:flex-row gap-12">
               <AsideProfile/>

                <section className="flex-1 space-y-8">
                    <MyVoucher />
                </section>
            </div>
        </div>
    </main>
}

export default ContentHistory