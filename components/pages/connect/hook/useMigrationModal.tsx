import { useDialog } from 'opize-design-system';

export function useMigrationModal() {
    const dialog = useDialog();

    return {
        open: () =>
            dialog({
                title: '기존에 사용하던 데이터베이스를 사용하시겠어요?',
                content: '기존에 사용하던 데이터베이스를 사용하거나 새로운 데이터베이스를 이용할 수 있어요.',
                buttons: [
                    {
                        children: '',
                        onClick: () => null,
                    },
                    {
                        children: '사용',
                        onClick: () => null,
                    },
                ],
            }),
    };
}
