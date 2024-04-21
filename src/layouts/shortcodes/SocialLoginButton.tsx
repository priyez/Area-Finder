
import Link from "next/link";
import Icon from "@/components/Icon";


    const SocialLoginButton = ({
        label,
       iconName,
       action,
      }: {
        label: string | any;
        style?: string | any;
        iconName: string;
        action: string;
      
      
      }) => {
        return (

                                <div className=" flex items-center justify-center btn border-gray-300 w-full mb-4 md:mb-2 px-2 h-[50%] md:h-[35%] pt-4 md:pt-3 rounded   me-1 no-underline bg-white ">
                                    <Icon icon={iconName} width={24} height={24} fill />
                                    <h3 className="font-semibold text-[12px] ml-6">{action} with {label}</h3>
                                </div>
     
    );
};

export default SocialLoginButton;
