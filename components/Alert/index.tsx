import React, { HTMLProps, useMemo } from 'react';
import { FeedbackMessageType } from '@/types/Feedback';
import { faClose, faEnvelope, faExclamationCircle, faInfoCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/** Props type for alert component */
export type AlertPropsType = HTMLProps<HTMLDivElement> & {
  /** Title of the alert */
  title: string;
  /** Description of the alert */
  description?: string;
  /** Variant of the alert. Controls color and icon. */
  variant?: FeedbackMessageType;
  /** Called when alert is closed. Shows close button. */
  onClose?: () => void;
};

/** Renders an alert component */
export default function Alert({
  title,
  description,
  variant,
  onClose,
  ...props
}: AlertPropsType) {
  const [classes, color, icon] = useMemo(() => {
    const baseClasses =
      'rounded-sm shadow-snackbar px-3 py-2 flex justify-between gap-4 w-full md:w-[388px]';
    let classes = 'bg-info-muted dark:bg-infoDark-muted text-info';
    let color = '#002737';
    let icon = faEnvelope;
    if (variant === 'error') {
      classes = 'bg-error-muted dark:bg-errorDark-muted text-error';
      color = '#491E1E';
      icon = faExclamationCircle;
    } else if (variant === 'info') {
      classes = 'bg-purple-muted dark:bg-purpleDark-muted text-purple';
      color = '#35134F';
      icon = faInfoCircle;
    } else if (variant === 'success') {
      classes = 'bg-success-muted dark:bg-successDark-muted text-success';
      color = '#0F241E';
      icon = faCheckCircle;
    } else if (variant === 'warning') {
      classes = 'bg-warning-muted dark:bg-warningDark-muted text-warning';
      color = '#301E03';
      icon = faTriangleExclamation;
    } else if (variant === 'loading') {
      classes =
        'items-center bg-primary dark:bg-primaryDark text-primary-contrast dark:text-primaryDark-contrast';
      color = '#C2C2C2';
    }
    return [[baseClasses, classes].join(' '), color, icon];
  }, [variant]);

  const isLoading = variant === 'loading';

  return (
    <div {...props} className={classes} role="alert">
      <div className="flex gap-2">
        {!isLoading && <FontAwesomeIcon
          icon={icon}
          tabIndex={props.onClick ? 0 : undefined}
        />}
        <div className="flex flex-col gap-0.5">
          <p>{title}</p>
          {description && (
            <p>{description}</p>
          )}
        </div>
      </div>
      {!isLoading ? (
        onClose && (
          <FontAwesomeIcon
            icon={faClose}
            tabIndex={props.onClick ? 0 : undefined}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
}
