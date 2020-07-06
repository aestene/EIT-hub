import pymavlink
import logging


logger = logging.getLogger('shuttle')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())
formatter = logging.Formatter('%(name)s-%(levelname)s: %(message)s')
logger.setFormatter(formatter)


def create_mavlink_connection(connenction_string: str):
    '''
    Establishes a connection to a ArduPilot device through the given 
    connection string. 
    Returns an object that handles the connection and message sending. 
    '''

    # Create the connection
    # Documentation on connection strings
    # http://mavlink.io/en/mavgen_python/
    logger.info('Connecting..')
    mavcon = pymavlink.mavutil.mavlink_connection(connenction_string)
    logger.info('Connection established')

    # Wait a heartbeat before sending commands
    logger.info('waiting for first heartbeat..')
    mavcon.wait_heartbeat()
    logger.info('Heartbeat recieved')

    # Arm thrusters 
    if not mavcon.motors_armed():
        logger.info('arming thrusters..')
        mavcon.arducopter_arm()
        mavcon.motors_armed_wait()
    logger.info('thrusters armed')

    return mavcon


def send_thrust_command(mavcon, x=0, y=0, z=500, r=0) -> None:
    '''
    Function that sends thrust commands to target device. 
    Values should be in the range [-1000, 1000], where
    1000 is full thottle ahead and negative is reverse.
    Z is mapped to [0, 1000].
    Documentation on manual control 
    https://mavlink.io/en/messages/common.html#MANUAL_CONTROL
    '''
    
    # Limit command values 
    x = 1000 if x > 1000 else x
    x = -1000 if x < -1000 else x

    y = 1000 if x > 1000 else y
    y = -1000 if x < -1000 else y

    z = 1000 if x > 1000 else z
    z = 0 if x < 0 else z

    r = 1000 if x > 1000 else r
    r = -1000 if x < -1000 else r

    # Send command
    mavcon.mav.manual_control_send(
        mavcon.target_system,
        x,
        y,
        z,
        r,
        0   # controller button pressed or not
    )


def log_data(mavcon):
    pass
