import { Button as PrimeButton } from 'primereact/button';
import { ButtonProps } from 'primereact/button';
import { classNames } from 'primereact/utils';

export const Button = (props: ButtonProps) => {
  const { children, className, ...rest } = props;

  const buttonClassName = classNames('p-button-rounded p-button-outlined p-button-text', className);

  return (
    <PrimeButton className={buttonClassName} {...rest}>
      {children}
    </PrimeButton>
  );
};
