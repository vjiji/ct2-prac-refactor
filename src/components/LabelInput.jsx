import styled from 'styled-components';
import Input from './Input';

function LabelInput({ id, placeholder, type, value, label, onChange }) {
  return (
    <LabelInputLayout>
      <label htmlFor={id}>
        <p>{label}</p>
      </label>
      <Input placeholder={placeholder} type={type} value={value} id={id} onChange={onChange} />
    </LabelInputLayout>
  );
}

const LabelInputLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  p {
    margin: 0;
    padding-bottom: 8px;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
  }
`;

export default LabelInput;
