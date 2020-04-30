import datetime
import re


def today_f():
    return datetime.datetime.now().strftime("%F")


def sanitize(string):
    """REMOVING ALL NON ALPHA-NUMERIC
    https://stackoverflow.com/questions/1276764/stripping-everything-but-alphanumeric-chars-from-a-string-in-python
    """
    santized = []
    for stringy in string.replace(',',' ').split():
        santized.append(re.sub(r'\W+', '',stringy).lower())
    return santized