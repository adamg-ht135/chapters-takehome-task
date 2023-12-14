import close from '../../assets/close-toast.svg';
const CloseButton = ({ closeToast }: {closeToast: any}) => (
    <i className="cursor-pointer absolute top-[32px] right-[31px] h-[20px] w-[20px] text-white" onClick={closeToast}>
     <img src={close}></img>
    </i>
);

export default CloseButton;