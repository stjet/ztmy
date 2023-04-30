
//convert string timestamp (eg 01:33:24) to seconds
export function convert_timestamp(string_timestamp: string) {
  let hours: number = Number(string_timestamp.split(":")[0]);
  let minutes: number = Number(string_timestamp.split(":")[1]);
  let seconds: number = Number(string_timestamp.split(":")[2]);
  return hours*60*60+minutes*60+seconds;
}
