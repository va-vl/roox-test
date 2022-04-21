import type { InputTypes, UserInput } from '@/types';
import { FormInput, FormTextarea } from '../Input';

type FormField =
  | {
      id: keyof UserInput;
      type: InputTypes;
      label: string;
      placeholder: string;
      required: boolean;
      component: typeof FormInput;
    }
  | {
      id: keyof UserInput;
      label: string;
      placeholder: string;
      required: boolean;
      component: typeof FormTextarea;
    };

export const formFields: FormField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'John Doe',
    required: true,
    component: FormInput,
  },
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'JohnDoe123',
    required: true,
    component: FormInput,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'johndoe@mail.com',
    required: true,
    component: FormInput,
  },
  {
    id: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'New York',
    required: true,
    component: FormInput,
  },
  {
    id: 'street',
    label: 'Street',
    type: 'text',
    placeholder: 'Main St.',
    required: true,
    component: FormInput,
  },
  {
    id: 'zipcode',
    label: 'Zip code',
    type: 'text',
    placeholder: '123456',
    required: true,
    component: FormInput,
  },
  {
    id: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '+1 (234) 56 78 900',
    required: true,
    component: FormInput,
  },
  {
    id: 'website',
    label: 'Website',
    type: 'text',
    placeholder: 'website.com',
    required: true,
    component: FormInput,
  },
  {
    id: 'comment',
    label: 'Comment',
    placeholder: 'Add your comment',
    required: false,
    component: FormTextarea,
  },
];
