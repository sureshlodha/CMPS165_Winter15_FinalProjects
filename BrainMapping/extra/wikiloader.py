import json
import wikipedia



#   Copyright 2012 Christopher L. Ramsey
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

#from collections import OrderedDict
#from re import match
#from re import split
#from re import sub
#
#class PathIterator(object):
#    EOI = 'End of Iteration'
#    PATH_IDENTIFIERS = r'[MLHVCSQTAmlhvcsqa]'
#    NUMBERS = r'[0-9.-^A-z]'
#    SEPERATORS = r'\s|\,'
#    PATH_END = r'[Zz]'
#
#    def __init__(self, path):
#        self.parseable = path.translate(None, '\t\f')
#        self.parseable = self.parseable.replace('\n', ' ')
#        print 'strip_newlines: {}'.format(self.parseable)
#        self.parseable = sub(r'([A-Za-z])([0-9]|\-)', self.insert, self.parseable)
#        print 'add_space: {}'.format(self.parseable)
#        self.parseable = self.parseable.replace(',', ' ')
#        print 'replace_commas: {}'.format(self.parseable)
#        self.parseable = sub(r'\s+', ' ', self.parseable) # replace any double space with a single space
#        print 'strip_extra_space: {}'.format(self.parseable)
#        self.tokens = split(' ', self.parseable)
#        self.map = self.produce_map(self.tokens)
#        print self.map
#        self.elements = self.process(self.map)
#
#    def produce_map(self, tkns):
#        self.m = OrderedDict()
#        self.i = 0
#        while self.i < len(tkns):
#            if match(self.PATH_IDENTIFIERS, tkns[self.i]):
#                self.m[self.i] = tkns[self.i]
#            elif match(self.PATH_END, tkns[self.i]):
#                self.m[self.i] = tkns[self.i]
#            else:
#                pass
#            self.i += 1
#        return self.m.items()
#
#    def process(self, map):
#        self.mm = []
#        self.l = len(map)
#        for e in range(self.l):
#            try:
#                self.element = map[e]
#                self.future = map[e + 1]
#                self.ident = self.element[1]
#                self.start = self.element[0] + 1
#                self.end = self.future[0]
#                self.nbrs = self.tokens[self.start:self.end]
#            except:
#                self.element = map[e]
#                self.ident = self.element[1]
#                self.start = self.element[0] + 1
#                self.end = len(self.tokens)
#                self.nbrs = self.tokens[self.start:self.end]
#                print 'start: {} end {}'.format(self.start, self.end)
#            finally:
#                self.numbers = []
#                for number in self.nbrs:
#                    self.numbers.append(float(number))
#                self.mm.append((self.ident, self.numbers))
#        return iter(self.mm)
#
#    def __iter__(self):
#        return iter(self.elements)
#
#    def insert(self, match_obj):
#        self.group = match_obj.group()
#        return '{} {}'.format(self.group[0], self.group[1])
#
#if __name__ == '__main__':
#    inkscape_path = "M 12,90 C 8.676,90 6,87.324 6,84 L 6,82 6,14 6,12 c 0,-0.334721 0.04135,-0.6507 0.09375,-0.96875 0.0487,-0.295596 0.09704,-0.596915 0.1875,-0.875 C 6.29113,10.12587 6.302142,10.09265 6.3125,10.0625 6.411365,9.774729 6.5473802,9.515048 6.6875,9.25 6.8320918,8.976493 7.0031161,8.714385 7.1875,8.46875 7.3718839,8.223115 7.5612765,7.995278 7.78125,7.78125 8.221197,7.353194 8.72416,6.966724 9.28125,6.6875 9.559795,6.547888 9.8547231,6.440553 10.15625,6.34375 9.9000482,6.443972 9.6695391,6.580022 9.4375,6.71875 c -0.00741,0.0044 -0.023866,-0.0045 -0.03125,0 -0.031933,0.0193 -0.062293,0.04251 -0.09375,0.0625 -0.120395,0.0767 -0.2310226,0.163513 -0.34375,0.25 -0.1061728,0.0808 -0.2132809,0.161112 -0.3125,0.25 C 8.4783201,7.442683 8.3087904,7.626638 8.15625,7.8125 8.0486711,7.942755 7.9378561,8.077785 7.84375,8.21875 7.818661,8.25713 7.805304,8.30462 7.78125,8.34375 7.716487,8.446782 7.6510225,8.548267 7.59375,8.65625 7.4927417,8.850956 7.3880752,9.071951 7.3125,9.28125 7.30454,9.30306 7.288911,9.3218 7.28125,9.34375 7.2494249,9.4357 7.2454455,9.530581 7.21875,9.625 7.1884177,9.731618 7.1483606,9.828031 7.125,9.9375 7.0521214,10.279012 7,10.635705 7,11 l 0,2 0,68 0,2 c 0,2.781848 2.2181517,5 5,5 l 2,0 68,0 2,0 c 2.781848,0 5,-2.218152 5,-5 l 0,-2 0,-68 0,-2 C 89,10.635705 88.94788,10.279012 88.875,9.9375 88.83085,9.730607 88.78662,9.539842 88.71875,9.34375 88.71105,9.3218 88.69545,9.30306 88.6875,9.28125 88.62476,9.107511 88.549117,8.913801 88.46875,8.75 88.42717,8.6672 88.38971,8.580046 88.34375,8.5 88.28915,8.40279 88.216976,8.31165 88.15625,8.21875 88.06214,8.077785 87.951329,7.942755 87.84375,7.8125 87.700576,7.63805 87.540609,7.465502 87.375,7.3125 87.36383,7.3023 87.35502,7.29135 87.34375,7.28125 87.205364,7.155694 87.058659,7.046814 86.90625,6.9375 86.803679,6.86435 86.701932,6.784136 86.59375,6.71875 c -0.0074,-0.0045 -0.02384,0.0044 -0.03125,0 -0.232039,-0.138728 -0.462548,-0.274778 -0.71875,-0.375 0.301527,0.0968 0.596455,0.204138 0.875,0.34375 0.55709,0.279224 1.060053,0.665694 1.5,1.09375 0.219973,0.214028 0.409366,0.441865 0.59375,0.6875 0.184384,0.245635 0.355408,0.507743 0.5,0.78125 0.14012,0.265048 0.276135,0.524729 0.375,0.8125 0.01041,0.03078 0.02133,0.06274 0.03125,0.09375 0.09046,0.278085 0.1388,0.579404 0.1875,0.875 C 89.95865,11.3493 90,11.665279 90,12 l 0,2 0,68 0,2 c 0,3.324 -2.676,6 -6,6 l -72,0 z"
#    mdn_path = "M10 80 Q 52.5 10, 95 80 T 180 80"
#    w3c_path = "M100,200 C100,100 250,100 250,200 S400,300 400,200"
#    w3c_path_neg = "M-100,200 C100,100 250,100 250,200 S-400,300 400,200"
#    w3c_path_nl = '''
#           M600,350 l 50,-25
#           a25,25 -30 0,1 50,-25 l 50,-25
#           a25,50 -30 0,1 50,-25 l 50,-25
#           a25,75 -30 0,1 50,-25 l 50,-25
#           a25,100 -30 0,1 50,-25 l 50,-25
#           '''
#    paths = [inkscape_path, mdn_path, w3c_path, str.strip(w3c_path_nl), w3c_path_neg]
#    for path in paths:
#        for char in PathIterator(path):
#            print char
#

def BFS(root, depth=0):

    try:
        if depth < 6:
            root['summary'] = wikipedia.summary(root['name'], sentences=4)
        else:
            root['summary'] = "No data for this region."
    except:
        root['summary'] = "no data for this region"

    if 'children' in root:
        for child in root['children']:
            BFS(child, depth+1)
    

if __name__ == "__main__":
    f = open('allen.json', 'r')

    # Load in the json file. Data is now an equivalent object.
    data = json.loads(f.read())

    BFS(data)

    open('allenwithwiki.json', 'w').write(json.dumps(data))





