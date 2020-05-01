import re


def sanitize(string, type):
    """REMOVING ALL NON ALPHA-NUMERIC
    https://stackoverflow.com/questions/1276764/stripping-everything-but-alphanumeric-chars-from-a-string-in-python
    """
    if (type == 'array'):

        sanitized = []
        for stringy in string.replace(',', ' ').split():
            sanitized.append(re.sub(r'\W+', '', stringy).lower())
    elif (type == 'string'):
        sanitized = re.sub(r'\W+', '', string)
    elif (type == 'email'):

        keep = '@.'
        sanitized = re.sub(r'[^\w' + keep + ']', '', string)

    return sanitized
