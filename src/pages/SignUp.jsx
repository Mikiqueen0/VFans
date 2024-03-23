
const SignUp = () => {
    return (
        <div className="bg-darkest-black h-full w-full grid grid-rows-3 xl:grid-cols-2 xl:grid-rows-1 gap-0">
            <section  className="bg-emerald-green grid row-span-1 xl:col-span-1 bottom-0 top-0 left-0 right-0 h-auto xl:rounded-bl-[90px] xl:rounded-tl-[90px] xl:ml-[4rem] xl:my-[3.8rem]">
                <img src="../assets/images/black-vfans.png" alt="vfans" className="xl:h-[4rem] h-[3rem] xl:mt-20 xl:ml-20 mt-14 ml-14 absolute"/>
                <div className="flex flex-col text-center text-nowrap w-auto h-full justify-center mx-[20%]">
                    <h1 className="font-poppin font-semibold xl:text-[2rem] text-[1.5rem]">
                        Welcome to
                    </h1>
                    <h1 className="font-poppin font-bold xl:text-[6rem] text-[4.5rem]">
                        VFans
                    </h1>
                    <h1 className="font-poppin font-medium xl:text-[1.25rem] text-[1rem]">
                        Create an account to unlock the ability to post content and engage in conversations!
                    </h1>
                </div>
            </section>
            <section className="bg-primary grid row-span-2 xl:col-span-1 text-wrap bottom-0 top-0 left-0 right-0 h-[100vh] px-[8rem] xl:py-[11.625rem] shadow-2xl shadow-primary">
                <div className="self-center">
                    <h1 className="font-poppin text-emerald-green font-bold text-[2.5rem]">
                        Create an account
                    </h1>
                    <p className="font-poppin text-emerald-green font-medium text-base mt-[16px]">
                        Let’s Become a part of our community!
                    </p>
                    <button className="bg-white rounded-[10px] w-full h-[75px] flex items-center justify-between mt-8 px-4">
                        <img src="../assets/images/google.png" alt="google" className="size-12" /> 
                        <p className="font-poppin text-[#7B7B7B] text-[1.25rem] p-6">
                            Use Google account
                        </p>
                        <div></div>
                    </button>
                    <div className="flex items-center gap-2 my-5">
                        <div className="flex-grow bg-emerald-green h-[1px]"></div>
                        <div className="font-poppin text-emerald-green">or</div>
                        <div className="flex-grow bg-emerald-green h-[1px]"></div>
                    </div>
                    <form action="">
                        <div className="flex flex-col gap-4 h-auto">
                            <input type="text" placeholder="Username" className="font-poppins text-xl font-extralight placeholder-[##7B7B7B] text-white bg-dark-field border-[0.5px] border-emerald-green rounded-[10px] py-5 px-6"/>
                            <input type="text" placeholder="Email" className="font-poppins text-xl font-extralight placeholder-[##7B7B7B] text-white bg-dark-field border-[0.5px] border-emerald-green rounded-[10px] py-5 px-6"/>
                            <input type="password" placeholder="Password" className="font-poppins text-xl font-extralight placeholder-[##7B7B7B] text-white bg-dark-field border-[0.5px] border-emerald-green rounded-[10px] py-5 px-6"/>
                            <input type="password" placeholder="Confirm Password" className="font-poppins font-extralight text-xl placeholder-[##7B7B7B] text-white bg-dark-field border-[0.5px] border-emerald-green rounded-[10px] py-5 px-6"/>
                        </div>
                        <button type="submit" className="font-poppin text-xl text-white font-bold bg-emerald-green w-full xl:mt-8 mt-6 xl:py-6 py-5 rounded-[10px]">SIGN UP</button>
                        <p className="font-poppin font-light text-base text-emerald-green mt-4 text-center">already have an account?
                            <span className="text-white underline m-1">
                                <a href="/">Login</a>
                            </span>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default SignUp