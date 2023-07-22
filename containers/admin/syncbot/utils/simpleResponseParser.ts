export const simpleResponseParser = (text: string) => {
    const token = text.split(' ');
    const res = [];

    res.push(`유저 아이디: ${token[0]}`);
    res.push(`성공 여부: ${token[1]}`);
    res.push(`마지막 단계: ${token[2]}`);
    res.push(`삭제된 노션 이벤트 ${token[3]}개`);
    res.push(`삭제된 이벤트링크 ${token[4]}개`);
    res.push(`연결된 캘린더 ${token[5]}개`);
    res.push(`업데이트된 구글 캘린더 이벤트 ${token[6]}개`);
    res.push(`업데이트된 노션 이벤트 ${token[7]}개`);
    res.push(`새로 연결된 캘린더 ${token[8]}개`);
    res.push(`새로 연결된 캘린더의 일정 수 ${token[9]}개`);
    res.push(`소요 시간: ${token[10]}s`);
    return res.join('\n');
};
