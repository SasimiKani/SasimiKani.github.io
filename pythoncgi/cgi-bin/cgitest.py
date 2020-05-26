#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi

html_body = """
<!DOCTYPE html>
<html>
<head>
<title></title>
        <style>
        </style>
</head>
<body>
        <p>%s</p>
</body>
</html>
"""

form = cgi.FieldStorage()
text = form.getvalue('text', '')

print(html_body % (text))