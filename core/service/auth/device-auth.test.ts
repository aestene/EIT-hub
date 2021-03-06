import DeviceAuth from "./device-auth";
import Time from "../utils/time";

function time2020() {
    const time = new Time();
    time.nowOverride = new Date(2020,0,0);
    return time;
}

function addTime(time: Time, secs: number) {
    if (time.nowOverride){
        time.nowOverride = new Date(time.nowOverride.getTime() + secs * 1000);
    }
}

test('Happy path accepted', () => {
    const time = time2020();

    const auth = new DeviceAuth(time);
    const key = auth.generateKey("test");
    expect(auth.checkKey(key, "test")).toBe(true);
});

test('Happy path reject', () => {
    const time = time2020();

    const auth = new DeviceAuth(time);
    auth.generateKey("test");
    expect(auth.checkKey("not the key", "test")).toBe(false);
});

test('Timeout', () => {
    const time = time2020();

    const auth = new DeviceAuth(time);
    const key = auth.generateKey("test");
    addTime(time, 61);
    expect(auth.checkKey(key, "test")).toBe(false);
});

test('Just accepted', () => {
    const time = time2020();

    const auth = new DeviceAuth(time);
    const key = auth.generateKey("test");
    addTime(time, 60);
    expect(auth.checkKey(key, "test")).toBe(true);
});

test('Wrong device', () => {
    const time = time2020();

    const auth = new DeviceAuth(time);
    const key = auth.generateKey("test");
    expect(auth.checkKey(key, "test2")).toBe(false);
});