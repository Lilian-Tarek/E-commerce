import ToastItem from "./ToastItem"
import { useAppSelector } from "@store/hooks";
import { AnimatePresence,motion } from 'motion/react'
const ToastList = () => {
  const { records } = useAppSelector(state=>state.toastSlice);
  return (
    <div className="absolute top-20 right-0 left-4 sm:left-auto sm:w-[360px] flex flex-col gap-3 z-50">
      <AnimatePresence>
        {records.map((record) => (
          <motion.div key={record.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            layout
          >
            <ToastItem
              key={record.id}
              title={record.title}
              id={record.id}
              message={record.message}
              type={record.type}
              delayAppearance={record.delayAppearance}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastList
