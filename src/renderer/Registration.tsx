import RegistrationTable from './RegistrationTable';

function Registration() {
  return (
    <div className="m-3">
      <RegistrationTable registered />
      <hr className="my-5" />
      <RegistrationTable registered={false} />
    </div>
  );
}

export default Registration;
