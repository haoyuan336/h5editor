#!/usr/bin/env python
import os;
import json;
basepath = './assets'
resourcePath ='./src/resources.js'
resType = ['.json','.png','.fnt','.jpg' ,'.xml']
resDict = {}
def addFile(d,p):
	n = os.path.split(p)
	t = os.path.splitext(n[1])
	l = n[1].split('.');
	if l[1]=='png' or l[1]=='jpg':
		name = l[0].replace('-','_')
	else:
		name = l[1]+'_'+l[0].replace('-','_')
	for x in resType:
		if t[1] ==x:
			if name in resDict:
				print 'Warning,res has repeat',p,resDict[name]
			resDict[name]=os.path.join(d, n[1])

def getResFromPath(d,p):
	if p =='':
		return []
	a = os.listdir(p)
	for x in a:
		curfile = os.path.join(p, x)
        	if 	os.path.isdir(curfile):
         		getResFromPath(os.path.join(d, x),curfile)
        	else:
				addFile(d,curfile)

def getPathFiles():
	getResFromPath('',basepath)
	s =json.dumps(resDict, sort_keys=True, indent=2)
	f = open(resourcePath, 'w')
	f.write("import defines from'./game-defines.js'")
	f.write('\nconst res =\r\n'+s)
	f.write('\n for (let i in res) {res[i] = defines.resPath+res[i];}')
	f.write('\n export default res')
 	f.close();

getPathFiles()