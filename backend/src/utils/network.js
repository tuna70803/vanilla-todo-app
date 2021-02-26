import { networkInterfaces } from 'os';

/**
 * 현재 머신의 ip address 목록을 리턴한다.
 * @return {array<string>} ip address 목록
 */
export const getIPs = () => {
    const interfaces = networkInterfaces()
    const keys = Object.keys(interfaces);
    const ips = [];
    for (const key of keys) {
        interfaces[key].filter(item => item.family === 'IPv4')
            .map(item => ips.push(item.address));
    }

    return ips;
};
