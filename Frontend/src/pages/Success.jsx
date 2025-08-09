export default function Success(){
  return (
    <div className="bg-white p-6 rounded shadow max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-semibold text-green-600">Payment Successful ✅</h1>
      <p className="mt-4">Thanks — your payment was received. You can close this tab.</p>
      <a className="mt-6 inline-block text-blue-600" href="/">Back to plans</a>
    </div>
  );
}
