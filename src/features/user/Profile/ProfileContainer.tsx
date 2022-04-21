import * as React from 'react';
import { useParams } from 'react-router-dom';
//
import { useDataStatusContext, useDataContextUpdater } from '@/providers';
import { ErrorMessage, NotFoundMessage } from '@/components';
import { APIRequestStatus, UserInput } from '@/types';
import { ProfileLayout, FormLayout, FormSkeleton } from './Profile';
import { logObject } from '@/lib';
import { formFields } from './formFields';

export const UserProfileContainer = () => {
  const [disabled, setDisabled] = React.useState(true);
  const { error, state } = useDataStatusContext();
  const { getUserById, updateUserById } = useDataContextUpdater();
  const { id } = useParams();
  const user = getUserById(String(id));

  if (state === APIRequestStatus.Idle || state === APIRequestStatus.Loading) {
    return (
      <ProfileLayout>
        <FormSkeleton />
      </ProfileLayout>
    );
  }

  if (state === APIRequestStatus.Error) {
    return (
      <ProfileLayout>
        <ErrorMessage message={error} />
      </ProfileLayout>
    );
  }

  if (!id || !user) {
    return (
      <ProfileLayout>
        <NotFoundMessage />
      </ProfileLayout>
    );
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const { target } = event;
    const data = new FormData(target as HTMLFormElement);
    const result = Object.fromEntries(data) as UserInput;
    logObject(result);
    updateUserById(id, result);
  };

  const handleDisabled = () => {
    setDisabled(!disabled);
  };

  return (
    <ProfileLayout handleDisabled={handleDisabled}>
      <FormLayout disabled={disabled} onSubmit={onSubmit}>
        {formFields.map(({ component: FormFieldComponent, id, ...props }) => (
          <FormFieldComponent
            key={id}
            id={id}
            defaultValue={user[id]}
            disabled={disabled}
            {...props}
          />
        ))}
      </FormLayout>
    </ProfileLayout>
  );
};
