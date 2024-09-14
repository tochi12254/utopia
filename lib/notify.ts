// import { toast } from "sonner";

// export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
//     if ('Notification' in window) {
//       const permission = await Notification.requestPermission();
//       return permission;
//     } else {
//     //   console.warn('Notifications are not supported in this browser.');
//       toast.warning("Notifications are not supported in this browser.");
//       return 'default';
//     }
//   };
  
//   /**
//    * Show a notification to the user.
//    * @param title - The title of the notification.
//    * @param options - Additional options for the notification.
//    */
//   export const showNotification = (title: string, options: NotificationOptions = {}): void => {
//     if ('Notification' in window) {
//       if (Notification.permission === 'granted') {
//         new Notification(title, options);
//       } else {
//         // console.warn('Notification permission not granted.');
//         toast.warning("Notification permission not granted.")
//       }
//     } else {
//     //   console.warn('Notifications are not supported in this browser.');
//     toast.warning("Notifications are not supported in this browser.")
//     }
//   };

//   useEffect(() => {
//     const requestPermission = async () => {
//       const permission = await requestNotificationPermission();
//       if (permission === 'granted') {
//         showNotification('Welcome to the site!', {
//           body: 'Here is your notification body.',
//           icon: '/path/to/icon.png',
//         });
//       }
//     };
  
//     requestPermission();
//   }, []);
  
//   // This could be triggered by some event or action in your application
//   const handleSomeEvent = () => {
//     showNotification('Event Happened!', {
//       body: 'Something significant just occurred.',
//       icon: '/path/to/icon.png',
//     });
//   };
  