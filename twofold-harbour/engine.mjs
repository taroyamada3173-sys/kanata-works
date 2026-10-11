export const directions = {up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]};
export function step(level, state, direction) {
  const d=directions[direction]; if(!d) return state.slice();
  const w=level.map[0].length,h=level.map.length;
  const next=state.map(p=>{const x=p%w+d[0],y=Math.floor(p/w)+d[1];return x<0||y<0||x>=w||y>=h||level.map[y][x]==='#'?p:y*w+x;});
  return next[0]===next[1]?state.slice():next;
}
export const won=(level,state)=>state[0]===level.goal[0]&&state[1]===level.goal[1];
export function solve(level,start=level.start) {
  const q=[start],prev=new Map([[start.join(','),null]]);
  for(let i=0;i<q.length;i++) {
    const current=q[i],key=current.join(',');
    if(won(level,current)){const path=[];let k=key;while(prev.get(k)){const [p,d]=prev.get(k);path.push(d);k=p;}return path.reverse();}
    for(const d of Object.keys(directions)){const n=step(level,current,d),nk=n.join(',');if(!prev.has(nk)){prev.set(nk,[key,d]);q.push(n);}}
  }return null;
}
